
import { BrowserQRCodeReader } from '@zxing/browser';
import { toast } from 'sonner';

export class QRScannerService {
  private codeReader: BrowserQRCodeReader;
  private videoElement: HTMLVideoElement | null = null;
  private isScanning = false;
  private controls: any = null;

  constructor() {
    this.codeReader = new BrowserQRCodeReader();
  }

  public async startScanner(
    videoElementId: string,
    onScanSuccess: (text: string) => void,
    onScanError?: (error: Error) => void
  ): Promise<void> {
    if (this.isScanning) {
      return;
    }

    try {
      this.videoElement = document.getElementById(videoElementId) as HTMLVideoElement;

      if (!this.videoElement) {
        throw new Error(`No video element found with id ${videoElementId}`);
      }

      // Request camera permissions
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      this.isScanning = true;
      
      // Start decoding from the video stream
      this.controls = await this.codeReader.decodeFromStream(
        stream, 
        this.videoElement, 
        (result) => {
          if (result) {
            onScanSuccess(result.getText());
          }
        }
      );
    } catch (error) {
      console.error('Error starting QR scanner:', error);
      if (onScanError) {
        onScanError(error as Error);
      } else {
        toast.error('Failed to access camera. Please check permissions.');
      }
    }
  }

  public stopScanner(): void {
    if (!this.isScanning) {
      return;
    }
    
    this.isScanning = false;
    
    if (this.controls) {
      this.controls.stop();
    }
    
    if (this.videoElement && this.videoElement.srcObject) {
      const tracks = (this.videoElement.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      this.videoElement.srcObject = null;
    }
  }
}

export const qrScannerService = new QRScannerService();
