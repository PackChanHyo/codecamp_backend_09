import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { on } from 'events';

// 1. 클라우드에서 저장할 폴더 만들기
// 2. 저장 기능 설치하기(GCP 전용)
// 3. 라이브러리 이름: @google-cloud/storage

@Injectable()
export class FilesService {
  upload({ file }) {
    console.log(file);
    //파일을 클라우드 스토리지에 저장하는 로직

    // storage 셋팅하기
    const storage = new Storage({
      projectId: 'backend09',
      keyFilename: 'gcp-file-storage',
    }).bucket('backend09');

    // 셋팅된 스토리지에 파일 올리기
    file
      .createReadStream()
      .pipe(storage.file(file.filename).createReadStream())
      .on('finish', () => console.log('성공'))
      .on('error', () => console.log('실패'));

    // 다운로드URL 브라우저에 보내기
    return file.filename;
  }
}
