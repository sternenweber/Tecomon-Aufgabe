import { Schema, model } from 'mongoose';

export interface WidgetDoc {
  location: string;
  createdAt: Date;
}

const widgetSchema = new Schema<WidgetDoc>({
  location: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: () => new Date() }
});

export const Widget = model<WidgetDoc>('Widget', widgetSchema);
