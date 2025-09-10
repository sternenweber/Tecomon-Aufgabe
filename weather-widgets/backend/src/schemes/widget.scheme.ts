import { z } from 'zod';

export const createWidgetBody = z.object({
  location: z.string().min(1).max(80)
});

export type CreateWidgetBody = z.infer<typeof createWidgetBody>;
