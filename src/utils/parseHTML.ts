import * as htmlparser2 from 'htmlparser2';
import { useWebView } from 'components/WebViewProvider';
import { logger } from './logger';

const log = logger('utils/parseHTML.ts');

export const parseHTML = async (webViewContext: ReturnType<typeof useWebView>) => {
	log.info('Starting parseHTML function');
	const { executeScript } = webViewContext;
	try {
		log.info('Executing script to get HTML content');
		const html = await executeScript<string>('document.documentElement.innerHTML');
		log.info('HTML content retrieved successfully');
		const dom = htmlparser2.parseDocument(html);
		log.info('HTML content parsed successfully');
		return dom;
	} catch (error) {
		log.error(`Error occurred: ${error}`);
		throw error;
	}
};
