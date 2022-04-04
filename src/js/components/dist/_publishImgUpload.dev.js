"use strict";

var imgWrap = "";
var imgArray = [];
$(".publish-inputfile").each(function () {
  $(this).on("change", function (e) {
    imgWrap = $(this).closest(".publish-action").find(".publish-img-wrap");
    var maxLength = $(this).attr("data-max-length");
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    var iterator = 0;
    filesArr.forEach(function (f, index) {
      if (!f.type.match("image.*")) {
        return;
      }

      if (imgArray.length > maxLength - 1) {
        return false;
      } else {
        var len = 0;

        for (var i = 0; i < imgArray.length; i++) {
          if (imgArray[i] !== undefined) {
            len++;
          }
        }

        if (len > maxLength - 1) {
          return false;
        } else {
          imgArray.push(f);
          var reader = new FileReader();

          reader.onload = function (e) {
            document.getElementById('previewProfilePicture').src = e.target.result;
            var c = new Croppie(document.getElementById('previewProfilePicture'), {
              viewport: {
                width: '80%',
                height: 300,
                type: 'square'
              },
              boundary: {
                width: '100%',
                height: 410
              },
              enableExif: true,
              enableOrientation: true
            });
            document.getElementById('done').addEventListener('click', function () {
              c.result('base64').then(function (base64) {
                var html = "<div class='publish-img-box'><div class='img-bg' style='background-image: url(" + base64 + ")' data-number='" + $(".publish-img-close").length + "' data-file='" + f.name + "'><button class='publish-img-close' type='button'></button></div></div>";
                imgWrap.append(html);
                iterator++;
              });
              c.destroy();
              document.getElementById('previewProfilePicture').src = '';
            });
            document.querySelectorAll('.graph-modal-close').forEach(function (element) {
              element.addEventListener('click', function () {
                c.destroy();
              });
            });
          };

          reader.readAsDataURL(f);
        }
      }
    });
  });
});
$("body").on("click", ".publish-img-close", function (e) {
  var file = $(this).parent().data("file");

  for (var i = 0; i < imgArray.length; i++) {
    if (imgArray[i].name === file) {
      imgArray.splice(i, 1);
      break;
    }
  }

  $(this).parent().parent().remove();
});