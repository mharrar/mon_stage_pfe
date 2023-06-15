export default interface MessageInterface {
  docId: string;
  content: string;
  createdAt: Date;

  sender: {
    uuid: string;
    username: string;
    jwtid: string;

  };
}
