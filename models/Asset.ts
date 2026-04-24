import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAsset extends Document {
  orgId: string;
  name: string;
  mediaType: 'image' | 'video';
  status: 'protected' | 'pending' | 'failed';
  fingerprintHash: string;
  fingerprintFrames?: string[];
  storageUrl: string;
  storagePath: string;
  uploadedAt: Date;
  fileSize: number;
}

const AssetSchema: Schema = new Schema({
  orgId: { type: String, required: true },
  name: { type: String, required: true },
  mediaType: { type: String, required: true, enum: ['image', 'video'] },
  status: { type: String, required: true, enum: ['protected', 'pending', 'failed'] },
  fingerprintHash: { type: String, required: true },
  fingerprintFrames: { type: [String], default: [] },
  storageUrl: { type: String, default: '' },
  storagePath: { type: String, default: '' },
  uploadedAt: { type: Date, default: Date.now },
  fileSize: { type: Number, required: true },
});

export const Asset: Model<IAsset> = mongoose.models.Asset || mongoose.model<IAsset>('Asset', AssetSchema);
