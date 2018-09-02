export function getFirstLetter(name) {
  if (name != null) {
    return name.charAt(0).toUpperCase();
  } else {
    return "-";
  }
}

export function convertCableMessagesToGiftedMessages(arrayOfMessages) {
  return arrayOfMessages.messages
    .map(message => {
      let image = null;
      let contentType = null;
      let fileName = null;
      if (message.files && message.files.length > 0) {
        contentType = message.files[0].content_type;
        image = `http://128.199.102.105${message.files[0].file_url}`;
        const fileData = JSON.parse(message.files[0].file_data);
        fileName = fileData.metadata.filename;
      }
      return {
        _id: message.id,
        text: message.content,
        createdAt: message.updated_at,
        user: {
          _id: message.sender_id,
          name: "Test"
        },
        image: image,
        contentType: contentType,
        fileName: fileName
      };
    })
    .reverse();
}
