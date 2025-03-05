import React, { createContext, useContext, useState, useRef, ReactNode, useCallback } from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import DialogScreen from './DialogScreen';
import { logger } from '../utils/logger';

interface WebViewContextProps {
	webViewRef: React.RefObject<WebView>;
	showWebView: () => void;
	hideWebView: () => void;
	isWebViewVisible: boolean;
	executeScript: <T = unknown>(script: string) => Promise<T>;
	setUrl: (url: string) => void;
	loadUrl: (url: string) => Promise<void>;
}

const log = logger('components/WebViewProvider.tsx');

const WebViewContext = createContext<WebViewContextProps | undefined>(undefined);

export const WebViewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	log.info('Initializing WebViewProvider');
	const webViewRef = useRef<WebView>(null);
	const [isWebViewVisible, setWebViewVisible] = useState(false);
	const [url, setUrl] = useState('https://facebook.com');
	const [, setIsLoading] = useState(false);
	const promiseMap = useRef<
		Map<string, { resolve: (value: any) => void; reject: (reason?: any) => void }>
	>(new Map());
	const loadUrlPromiseRef = useRef<{
		resolve: () => void;
		reject: (error: Error) => void;
	} | null>(null);

	const showWebView = useCallback(() => {
		log.info('Showing WebView');
		setWebViewVisible(true);
	}, []);

	const hideWebView = useCallback(() => {
		log.info('Hiding WebView');
		setWebViewVisible(false);
	}, []);

	const handleUrlChange = useCallback((newUrl: string) => {
		log.info(`URL changed to: ${newUrl}`);
		setUrl(newUrl);
	}, []);

	const onMessage = useCallback((event: WebViewMessageEvent) => {
		log.info('Received message from WebView');
		try {
			const { messageId, result, error } = JSON.parse(event.nativeEvent.data);
			const { resolve, reject } = promiseMap.current.get(messageId) || {};

			if (error) {
				log.error(`WebView script execution error: ${error}`);
				reject?.(new Error(error));
			} else {
				log.info(`WebView script execution successful for messageId: ${messageId}`);
				resolve?.(result);
			}

			promiseMap.current.delete(messageId);
		} catch (err) {
			log.error(`Error parsing WebView message: ${err}`);
		}
	}, []);

	const executeScript = useCallback(<T = unknown,>(script: string): Promise<T> => {
		log.info(
			`Executing script in WebView: ${script.substring(0, 50)}${script.length > 50 ? '...' : ''}`
		);
		return new Promise<T>((resolve, reject) => {
			if (!webViewRef.current) {
				log.error('WebView not initialized');
				return reject(new Error('WebView not initialized'));
			}

			const messageId = Date.now().toString();
			const wrappedScript = `
        (async () => {
          try {
            const result = await (${script});
            window.ReactNativeWebView.postMessage(
              JSON.stringify({ messageId: '${messageId}', result: result })
            );
          } catch (error) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({ messageId: '${messageId}', error: error.message })
            );
          }
        })(); true;
      `;

			promiseMap.current.set(messageId, { resolve, reject });
			log.info(`Injecting script with messageId: ${messageId}`);
			webViewRef.current.injectJavaScript(wrappedScript);
		});
	}, []);

	const handleLoadStart = useCallback(() => {
		log.info(`WebView started loading URL: ${url}`);
		setIsLoading(true);
	}, [url]);

	const handleLoadEnd = useCallback(() => {
		log.info(`WebView finished loading URL: ${url}`);
		setIsLoading(false);
		if (loadUrlPromiseRef.current) {
			log.info('Resolving loadUrl promise');
			loadUrlPromiseRef.current.resolve();
			loadUrlPromiseRef.current = null;
		}
	}, [url]);

	const handleLoadError = useCallback(
		(error: any) => {
			log.error(`WebView load error for URL ${url}: ${JSON.stringify(error)}`);
			setIsLoading(false);
			if (loadUrlPromiseRef.current) {
				loadUrlPromiseRef.current.reject(new Error(`Failed to load: ${error}`));
				loadUrlPromiseRef.current = null;
			}
		},
		[url]
	);

	const handleNavigationStateChange = useCallback(
		(navState: any) => {
			log.info(`Navigation state changed: URL=${navState.url}, loading=${navState.loading}`);
			if (!navState.loading && loadUrlPromiseRef.current && navState.url.includes(url)) {
				log.info('Resolving loadUrl promise from navigation state change');
				loadUrlPromiseRef.current.resolve();
				loadUrlPromiseRef.current = null;
			}
		},
		[url]
	);

	const loadUrl = useCallback(
		(newUrl: string): Promise<void> => {
			log.info(`Loading URL: ${newUrl}`);
			return new Promise<void>((resolve, reject) => {
				if (!webViewRef.current) {
					log.error('WebView not initialized during loadUrl');
					return reject(new Error('WebView not initialized'));
				}

				loadUrlPromiseRef.current = { resolve, reject };

				if (newUrl === url) {
					log.info('URL is the same, forcing reload');
					webViewRef.current.injectJavaScript(`
          window.location.href = '${newUrl}';
          true; // needed for injectJavaScript
        `);
				} else {
					log.info(`Setting new URL: ${newUrl}`);
					setUrl(newUrl);
				}

				setTimeout(() => {
					if (loadUrlPromiseRef.current) {
						log.warn('loadUrl timed out after 15 seconds');
						loadUrlPromiseRef.current.resolve();
						loadUrlPromiseRef.current = null;
					}
				}, 15000);
			});
		},
		[url]
	);

	log.info('Rendering WebViewProvider');
	return (
		<WebViewContext.Provider
			value={{
				webViewRef,
				showWebView,
				hideWebView,
				isWebViewVisible,
				executeScript,
				setUrl,
				loadUrl,
			}}
		>
			{children}
			<DialogScreen
				url={url}
				onUrlChange={handleUrlChange}
				onClose={hideWebView}
				isWebViewVisible={isWebViewVisible}
				webViewRef={webViewRef}
			>
				<WebView
					ref={webViewRef}
					source={{ uri: url }}
					style={{ flex: 1 }}
					onMessage={onMessage}
					onLoadStart={handleLoadStart}
					onLoadEnd={handleLoadEnd}
					onError={handleLoadError}
					onNavigationStateChange={handleNavigationStateChange}
				/>
			</DialogScreen>
		</WebViewContext.Provider>
	);
};

export const useWebView = () => {
	const context = useContext(WebViewContext);
	if (!context) {
		log.error('useWebView called outside WebViewProvider');
		throw new Error('useWebView must be used within a WebViewProvider');
	}
	return context;
};
