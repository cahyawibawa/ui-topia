import { map } from '@/.map';
import { createMDXSource, defaultSchemas } from 'fumadocs-mdx';
import {  loader } from 'fumadocs-core/source';
import { z } from 'zod';
import { icons } from 'lucide-react';
import { create } from '@/components/icons';


const frontmatterSchema = defaultSchemas.frontmatter.extend({
  preview: z.string().optional(),
  toc: z.boolean().default(true),
  index: z.boolean().default(false),
});

export const  { getPage, getPages, pageTree }  = loader({
  baseUrl: '/docs',
  rootDir: 'docs',
  icon(icon) {
    if (icon in icons)
      return create({ icon: icons[icon as keyof typeof icons] });
  },
  source: createMDXSource(map, { schema: { frontmatter: frontmatterSchema } }),
});

