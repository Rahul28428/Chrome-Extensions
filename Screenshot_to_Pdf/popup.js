document.addEventListener('DOMContentLoaded', function() {
    var captureBtn = document.getElementById('captureBtn');
    var generateBtn = document.getElementById('generateBtn');
    var downloadLink = document.getElementById('downloadLink');
    var imageList = [];
  
    captureBtn.addEventListener('click', function() {
        chrome.tabs.captureVisibleTab(null, { format: 'png' }, function(dataUrl) {
          console.log('Image captured:', dataUrl);
          imageList.push(dataUrl);
        });
      });
      
  
    generateBtn.addEventListener('click', function() {
      var doc = new jsPDF();
  
      for (var i = 0; i < imageList.length; i++) {
        doc.addImage(imageList[i], 'PNG', 10, 10, 100, 0);
        if (i < imageList.length - 1) {
          doc.addPage();
        }
      }
  
      var pdfData = doc.output('blob');
      var url = URL.createObjectURL(pdfData);
  
      downloadLink.href = url;
      downloadLink.style.display = 'block';
    });
  });
  