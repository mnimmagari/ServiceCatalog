angular.module('dropzone', [])

.controller('fileattachmentDirectiveControllerMain', ['$scope', '$http','$mdDialog', '$mdMedia','Upload','growl','$timeout', function($scope, $http, $mdDialog, $mdMedia,Upload,growl,$timeout) {
console.log('snmdnmdbf')
 var folderType = $scope.folderType;
 var filesize = $scope.fileSize;
 var files = $scope.fileAllowed;
 var fileExt = $scope.fileExt;
 $scope.array = [];
 $scope.showPanel = false;

 $scope.dropzoneConfig = {
  'options': { 
   'url': '/api/v1/multiupload/' + folderType,
   'maxFilesize': filesize,
   'maxThumbnailFilesize': 10,
   'parallelUploads': 10,
   'autoProcessQueue': true,
   'uploadMultiple': false,
   'maxFiles': files,
   'acceptedFiles': fileExt,
   init: function () {
     var dropzone = this;
     $("#close").click(function(){
      dropzone.removeAllFiles(true);
    });
   }
 },
 'eventHandlers': {
  'sending': function (file, xhr, formData) {
  },

  'addedfile': function(file) {
    if (file.type ==='application/msword' || file.type ==='application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type ==='application/vnd.ms-excel.sheet.macroEnabled.12')
    {
      this.emit("thumbnail", file, "/public/images/word.png");
    }

    else if (file.type ==='application/vnd.ms-excel' || file.type ==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
      this.emit("thumbnail", file, "/public/images/excel.jpg");
    }

    else if(file.type === 'application/vnd.ms-powerpointtd>' || file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'){
      this.emit("thumbnail", file, "/public/images/ppt.png");
    }

    else if (file.type ==='application/pdf'){
      this.emit("thumbnail", file, "/public/images/pdf.jpg");
    }

    else if (file.type === 'video/mp4' || file.type === 'video/mkv' || file.type === 'video/avi' || file.type === 'video/wmv')
    {
      this.emit("thumbnail", file, "/public/images/video.png");
    }

    else if (file.type === 'audio/mp3' || file.type === 'audio/wav' || file.type === 'audio/aac')
    {
      this.emit("thumbnail", file, "/public/images/audio.png");
    }
  },
  'success': function (file, responseText) {
    // console.log(responseText);
    if(responseText!=null)
    {
      var filepath = responseText.file.path;
      var imagepath = '/'+ filepath.replace(/\\/g , "/");
      if($scope.fileType == 'singleFile')
      {
        $scope.array.splice(0,1);  
        $scope.array.push(imagepath);
      }

      if($scope.fileType == 'multiFile')
      {
        $scope.array.push(imagepath);
        if($scope.array.length>files)
        { 
          $scope.array.splice(-1,1);
          $scope.message = "Max Files Allowed to attach are:" + files;
          $timeout(function () { $scope.message = ''; }, 10000);
        }
      }
    }
  },


  'removedfile' : function(file) {
    var jsonObj = JSON.parse(file.xhr.responseText);
  }
}
};

var dropzoneConfig =$scope.dropzoneConfig;

$scope.status = '  ';

$scope.showUploadButton = function(ev) {
 $mdDialog.show({
  controller: DialogUploadCtrl,
  templateUrl: 'templates/fileDialog.html',
  parent: angular.element(document.body),
  locals: { dropzoneConfig: dropzoneConfig },
  targetEvent: ev,
  clickOutsideToClose:false

})
 .then(function(answer) {
  $scope.status = 'You said the information was "' + answer + '".';
}, function() {
  $scope.status = 'You cancelled the dialog.';
});

};


$scope.removeImageItem = function(index,x){
  $scope.array.splice(index, 1);
  localStorage.removeItem(x);
};

$scope.viewImageItem = function(x){
  window.open(x,'_blank');
};

$scope.delete = function(index){
  $scope.array =[];
  $mdDialog.hide();
}

$scope.cancelDialog = function(){
 $('#myModal').modal('hide');
}

}])

.directive('fileattachment',function($http){
  return {
    controller: 'fileattachmentDirectiveControllerMain',
    templateUrl: 'templates/fileAttachment.html',
    scope: {
      folderType:"@folderType",
      fileSize:"@fileSize",
      fileAllowed:"@fileAllowed",
      array: "=array",
      fileType: "@fileType",
      title: "@title",
      summary:"@summary",
      view: "@view",
      type: "@type",
      fileRefDataParam:"=fileRefDataParam",
      fileExt: "@fileExt"
    },
    link: function(scope, element, attrs) {

      scope.$on('getfileRefDoc', function(event,id) {
        $http.get('/api/v1/secure/fileAttachRef/' + id).success(function(response) {
          if(response!=null)
          { 
            scope.array=[];
            scope.fileRefDataParam = true;
            for(var i=0;i<response.attachment.length;i++)
            {
              scope.array.push(response.attachment[i]);
            }
          }
        }).error(function(error, status) {
          if (status == 500) {
            scope.fileRefDataParam = false;
          }
        });    
      });
      
      scope.$on('createfileRefDoc', function(event,data) {
        var id = data.refDoc;
        $http.post('/api/v1/secure/fileAttachRef/' + id, data).success(function(response) {});
      });

      scope.$on('updatefileRefDoc', function(event,data) {
        var id = data.refDoc;
        $http.put('/api/v1/secure/fileAttachRef/' + id, data).success(function(response) {});
      });
    }
  }
})

.directive('dropzone', function () {

  return function (scope, element, attrs) {
    var config, dropzone;

    config = scope[attrs.dropzone];
    dropzone = new Dropzone(element[0], config.options);

    angular.forEach(config.eventHandlers, function (handler, event) {
      dropzone.on(event, handler);
    });
  };
});

function DialogUploadCtrl($scope, $mdDialog,dropzoneConfig) {
  $scope.dropzoneConfig =dropzoneConfig;
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };

}
