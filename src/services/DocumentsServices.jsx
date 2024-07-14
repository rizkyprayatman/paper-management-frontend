import Api from "../utils/Api";

class DocumentsServices {
  static async getAllJenisDocument() {
    const response = await Api.get(`/jenis-documents`);
    console.log(response);
    return response;
  }

  static async getAllDocument(data) {
    const response = await Api.get(
      `/get-all-documents?page=${data.page}&perPage=${data.perPage}&sort=${data.sort}&order=${data.order}&search=${data.search}`
    );
    console.log(response);
    return response;
  }

  static async addDocument(data) {
    const response = await Api.post(`/upload-document`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response;
  }

  static async shareDocument(data) {
    const response = await Api.post(`/share-document/${data.id}`, data);
    console.log(response);
    return response;
  }

  static async downloadDocument(id) {
    const response = await Api.get(`/download-documents/${id}`);
    console.log(response);
    return response;
  }

  static async getDocumentDetail(id) {
    const response = await Api.get(`/documents/${id}`);
    console.log(response);
    return response;
  }

  static async deleteDocument(id) {
    const response = await Api.delete(`/delete-document/${id}`);
    // console.log(response);
    return response;
  }
}

export default DocumentsServices;
