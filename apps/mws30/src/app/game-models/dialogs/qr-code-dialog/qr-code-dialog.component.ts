import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GameContext } from '@aloofly/mws30-models';

declare var QRCode: any;

@Component({
  selector: 'mws30-qr-code-dialog',
  templateUrl: './qr-code-dialog.component.html',
  styleUrls: ['./qr-code-dialog.component.scss']
})
export class QrCodeDialogComponent implements AfterViewInit {
  @ViewChild('qrCode') qrCodeCanvas: ElementRef<HTMLCanvasElement>;

  constructor(
    private matDialogRef: MatDialogRef<QrCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public ctx: GameContext
  ) {}

  ngAfterViewInit(): void {
    const {game, player} = this.ctx;
    QRCode.toCanvas(this.qrCodeCanvas.nativeElement, `${game.url}/${player.id}`);
  }

  close(): void {
    this.matDialogRef.close();
  }
}
