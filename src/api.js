// import axios from "axios";

export default {
  saveLog(log) {
    const url = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id';

    const fileContent = log; // As a sample, upload a text file.
    const file        = new Blob([fileContent], {type: 'text/plain'});
    const fileName = 'log-' + log.createdAt;
    const metadata    = {
      'name'    : fileName,
      'mimeType': 'application/json',
      'parents' : ['appDataFolder'],
    };

    const accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
    const form        = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
    form.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('post', url);
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
      fields: 'nextPageToken, files(id, name)',
      pageSize: 10
    })
  }
};
