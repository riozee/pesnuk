import { Document, Element } from 'domhandler';
import { getAttributeValue, textContent } from 'domutils';
import { selectOne } from 'css-select';
import { logger } from '../logger';

const log = logger('utils/scrapers/notifications.ts');

export type NotificationType = {
	imageUrl: string;
	title: string;
	date: string;
	read: boolean;
	elementPath: string;
};

// current limitations: somehow it only returns at most 4 notifications...
// planned strategy: inject a javascript selector directly inside webview then get the html string
// - requirements: parseHTML() util must be modified

export const notificationScraper = (doc: Document) => {
	log.info('Starting notificationScraper function');
	const notifications: NotificationType[] = [];

	const container = selectOne('#screen-root > div > div:nth-child(3)', doc);
	if (!container) {
		log.warn('Failed to find notification container');
		return [];
	}

	const notificationElements = container.children;
	if (!notificationElements.length) {
		log.warn('No notification elements found');
		return [];
	}

	for (const [index, notificationElement] of Object.entries(notificationElements)) {
		try {
			const elementPath = `#screen-root > div > div:nth-child(3) > div:nth-child(${Number(index) + 1})`;
			let read = false;

			// in browser it's div:nth-child(4) and (5) but somehow it's increased by 1
			// turns out it wasn't the case. DIFFERENT ACCOUNT HAVE DIFFERENT STRUCTURE
			// some is nth-child(4) and (5), some is nth-child(5) and (6)
			// is there a way to check it? nothing as the content is in natural language...

			// "div:nth-child(3) >" is for unread notifications
			let imageElement = selectOne(
				'div:nth-child(3) > div:nth-child(1) > img',
				notificationElement
			) as unknown;
			let titleElement = selectOne('div:nth-child(3) > div:nth-child(4)', notificationElement);
			let dateElement = selectOne('div:nth-child(3) > div:nth-child(5)', notificationElement);

			if (!imageElement || !titleElement || !dateElement) {
				read = true;
				// "div:nth-child(2) >" is for read notifications
				imageElement = selectOne(
					'div:nth-child(2) > div:nth-child(1) > img',
					notificationElement
				) as unknown;
				titleElement = selectOne('div:nth-child(2) > div:nth-child(4)', notificationElement);
				dateElement = selectOne('div:nth-child(2) > div:nth-child(5)', notificationElement);

				if (!imageElement || !titleElement || !dateElement) {
					log.warn('Skipping elements ' + index + ' as they are not in expected format');
					continue;
				}
			}

			const imageUrl = getAttributeValue(imageElement as Element, 'src');
			const title = textContent(titleElement)?.trim();
			const date = textContent(dateElement)?.trim();

			if (!imageUrl || !title || !date) {
				log.warn('Expected format but failed to extract data from elements ' + index);
				continue;
			}

			notifications.push({ imageUrl, title, date, read, elementPath });
			log.info(`Notification added: ${title}`);
		} catch (e) {
			log.error(`Error processing notification: ${e}`);
		}
	}

	log.info('Finished processing notifications');
	return notifications;
};
