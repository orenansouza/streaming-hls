const Minio = require('minio');



class MinioService {
  constructor(endpoint, accessKey, secretKey, port, useSSL = true) {
    this.DEFAULT_EXPIRES = 7 * 24 * 60 * 60
    this.endpoint = endpoint;
    this.accessKey = accessKey;
    this.secretKey = secretKey;
    this.port = port;
    this.useSSL = useSSL;
    try {

      this.client = new Minio.Client({
        endPoint: this.endpoint,
        port: this.port,
        accessKey: this.accessKey,
        secretKey: this.secretKey,
        useSSL: this.useSSL
      });
    } catch (error) {
      console.log(error)
    }
  }

  async listBuckets() {
    try {
      const buckets = await this.client.listBuckets();
      return buckets.map(bucket => bucket.name);
    } catch (err) {
      console.error("Error:", err);
      return [];
    }
  }

  async createBucket(bucketName) {
    try {
      await this.client.makeBucket(bucketName);
      return true;
    } catch (err) {
      console.error("Error:", err);
      return false;
    }
  }

  async uploadFile(bucketName, filePath, objectName = null) {
    try {
      if (!objectName) {
        objectName = filePath.split('/').pop();
      }
      await this.client.fPutObject(bucketName, objectName, filePath);
      return true;
    } catch (err) {
      console.error("Error:", err);
      return false;
    }
  }

  async downloadFile(bucketName, objectName, filePath) {
    try {
      await this.client.fGetObject(bucketName, objectName, filePath);
      return true;
    } catch (err) {
      console.error("Error:", err);
      return false;
    }
  }

  async removeObject(bucketName, objectName) {
    try {
      await this.client.removeObject(bucketName, objectName);
      return true;
    } catch (err) {
      console.error("Error:", err);
      return false;
    }
  }

  async removeBucket(bucketName) {
    try {
      await this.client.removeBucket(bucketName);
      return true;
    } catch (err) {
      console.error("Error:", err);
      return false;
    }
  }

  async presignedGetObject(bucketName, objectName, expiresInSeconds = this.DEFAULT_EXPIRES) {
    try {
      return this.client.presignedGetObject(bucketName, objectName, expiresInSeconds);
    } catch (err) {
      console.error(err)
      return false;
    }
  }
}

module.exports = MinioService