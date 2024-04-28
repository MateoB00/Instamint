import { Module } from '@nestjs/common';
import { OriginalContentService } from '../services/original-content.service';
import { OriginalContentController } from 'src/controllers/original-content.controller';
import { FirebaseService } from 'src/services/firebase.service';

@Module({
  imports: [],
  controllers: [OriginalContentController],
  providers: [OriginalContentService, FirebaseService],
  exports: [OriginalContentService],
})
export class OriginalContentModule {}
