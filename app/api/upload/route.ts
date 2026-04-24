import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Asset } from '@/models/Asset';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Connect to MongoDB
    await connectToDatabase();
    
    // Create new Asset
    const newAsset = await Asset.create({
      orgId: body.orgId || 'default_org',
      name: body.name,
      mediaType: body.mediaType,
      status: body.status || 'protected',
      fingerprintHash: body.fingerprintHash,
      fingerprintFrames: body.fingerprintFrames || [],
      storageUrl: body.storageUrl || '',
      storagePath: body.storagePath || '',
      fileSize: body.fileSize,
      uploadedAt: new Date(),
    });

    return NextResponse.json(
      { message: 'Asset created successfully', asset: newAsset },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error uploading asset:', error);
    return NextResponse.json(
      { error: 'Failed to upload asset' },
      { status: 500 }
    );
  }
}
