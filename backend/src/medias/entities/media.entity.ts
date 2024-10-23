import { MediaType } from 'src/helper/helper.enum';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Media {
  @PrimaryGeneratedColumn()
  media_id: string;

  @Column()
  post_id: string;

  @Column({
    type: 'enum',
    enum: MediaType,
  })
  mediaType: MediaType;

  @Column()
  url: string;
}
