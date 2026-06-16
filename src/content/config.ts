---
import { defineCollection, getCollection } from 'astro:content';
import type { Collection } from 'astro';

export const collections = {
	'study-guides': defineCollection({
		type: 'content',
		schema: ({ image }) => ({
			title: { reference: 'string', optional: false },
			examCode: { type: 'string', optional: true },
			description: { type: 'string', optional: true },
			officialLink: { type: 'string', optional: true },
			difficulty: { type: 'string', optional: true },
		}),
	}),
	'blog': defineCollection({
		type: 'content',
		schema: ({ image }) => ({
			title: { type: 'string', optional: false },
			pubDate: { type: 'date', optional: false },
			description: { type: 'string', optional: true },
		}),
	}),
	'wiki': defineCollection({
		type: 'content',
		schema: ({ image }) => ({
			title: { type: 'string', optional: false },
			category: { type: 'string', optional: true },
		}),
	}),
};
