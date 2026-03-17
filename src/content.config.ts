import { defineCollection } from "astro:content";
import type { CollectionConfig } from "astro/content/config";
import { glob } from "astro/loaders";
import { z } from "zod/v4";

type PostData = {
	title: string;
	published: Date;
	updated?: Date;
	draft: boolean;
	description: string;
	image: string;
	tags: string[];
	category: string | null;
	lang: string;
	prevTitle: string;
	prevSlug: string;
	nextTitle: string;
	nextSlug: string;
};

type SpecData = Record<string, never>;

const postsSchema: z.ZodType<PostData> = z.object({
	title: z.string(),
	published: z.date(),
	updated: z.date().optional(),
	draft: z.boolean().optional().default(false),
	description: z.string().optional().default(""),
	image: z.string().optional().default(""),
	tags: z.array(z.string()).optional().default([]),
	category: z.string().optional().nullable().default(""),
	lang: z.string().optional().default(""),

	/* For internal use */
	prevTitle: z.string().default(""),
	prevSlug: z.string().default(""),
	nextTitle: z.string().default(""),
	nextSlug: z.string().default(""),
});

const specSchema: z.ZodType<SpecData> = z.object({});

const postsCollection: CollectionConfig<
	typeof postsSchema,
	ReturnType<typeof glob>
> = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
	schema: postsSchema,
});
const specCollection: CollectionConfig<
	typeof specSchema,
	ReturnType<typeof glob>
> = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/spec" }),
	schema: specSchema,
});

type Collections = {
	posts: typeof postsCollection;
	spec: typeof specCollection;
};

export const collections: Collections = {
	posts: postsCollection,
	spec: specCollection,
};
