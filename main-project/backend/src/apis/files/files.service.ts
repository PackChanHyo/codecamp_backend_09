import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

// 1. 클라우드에서 저장할 폴더 만들기
// 2. 저장 기능 설치하기(GCP 전용)
// 3. 라이브러리 이름: @google-cloud/storage

@Injectable()
export class FilesService {
  async upload({ files }) {
    console.log(files);
    //파일을 클라우드 스토리지에 저장하는 로직

    const waitedFiles = await Promise.all(files);
    console.log(waitedFiles);

    // storage 셋팅하기
    const bucket = 'codecamp-storages';
    const storage = new Storage({
      projectId: 'backend09',
      keyFilename: 'gcp-file-storage.json',
    }).bucket(bucket); //'backend09'

    // 셋팅된 스토리지에 파일 올리기
    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise((resolve, reject) => {
            el.createReadStream()
              .pipe(storage.file(el.filename).createWriteStream())
              .on('finish', () => resolve(`${bucket}/${el.filename}`))
              .on('error', () => reject('실패'));
          }),
      ),
    );
    console.log(results);
    // // 다운로드URL 브라우저에 보내기
    return results;
  }
}
