// import axios from "axios";

export default {
  saveLog(log, props={}, id=null) {
    const url = id !== null
      ? `https://www.googleapis.com/upload/drive/v3/files/${id}?uploadType=multipart&fields=id`
      : `https://www.googleapis.com/upload/drive/v3/files/?uploadType=multipart&fields=id`;

    const fileContent = JSON.stringify(log); // As a sample, upload a text file.
    const file        = new Blob([fileContent], {type: 'text/plain'});
    const fileName = 'log-' + log.createdAt;
    const metadata    = {
      'name'    : fileName,
      'mimeType': 'application/json',
      'properties': props,
    };

    if (id == null) {
      metadata['parents'] = ['appDataFolder'];
    }

    const accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
    const form        = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
    form.append('file', file);
    const method = id == null ? 'POST' : 'PATCH';

    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.responseType = 'json';
    xhr.onload       = () => {
      console.log('作成');
      console.log(xhr.response.id); // Retrieve uploaded file ID.
    };
    xhr.send(form);
  },

  loadLogs() {
    return gapi.client.drive.files.list({
      spaces: 'appDataFolder',
      fields: 'nextPageToken, files(id, name, properties)',
      pageSize: 10
    })
  },

  loadLog(logID) {
    return gapi.client.drive.files.get({
      fileId: logID,
      fields: '*',
      alt: 'media',
    });
  },
};
