tinymce.init({
  selector: 'textarea#local-upload',
  plugins: 'image code',
  toolbar: 'undo redo | image code',
  images_upload_url: 'postAcceptor.php',

  images_upload_handler: function (blobInfo, success, failure) {
    setTimeout(function () {
      success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
    }, 2000);
  },
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
});