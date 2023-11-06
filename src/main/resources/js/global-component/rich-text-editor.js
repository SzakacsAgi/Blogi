tinymce.init({
  selector: 'textarea#local-upload',
  plugins: 'importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
  toolbar: "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough removeformat | align numlist bullist | link image table media | forecolor backcolor | lineheight outdent indent| emoticons",
  images_upload_url: 'postAcceptor.php',

  images_upload_handler: function (blobInfo, success, failure) {
    setTimeout(function () {
      success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
    }, 2000);
  },
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
});