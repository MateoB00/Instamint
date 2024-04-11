import { Module } from '@nestjs/common';
import { ContentService } from '../services/content.service';
import { ContentController } from '../controllers/content.controller';

@Module({
  imports: [],
  controllers: [ContentController],
  providers: [ContentService],
  exports: [ContentService],
})
export class FirebaseModule {}
