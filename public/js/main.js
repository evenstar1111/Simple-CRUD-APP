const updateBtn   = document.getElementById('update-button');
const delBtn      = document.getElementById('delete-button');
const postBtn     = document.getElementById('post-button');
const messageBox  = document.getElementById('responseMessage');
const refreshBtn  = document.getElementById('tableRefreshBtn');
const table       = document.getElementById('resTable');
const tbody       = table.getElementsByTagName('TBODY')[0];


updateBtn.addEventListener('click', _ => {
   const data = 
   {
      filter: document.getElementById('update-filter').value,
      title: document.getElementById('update-title').value,
      content: document.getElementById('update-content').value
   };

   makeFetchRequest('put', data);
});


delBtn.addEventListener('click', _ => {
   const data = 
   {
      filter: document.getElementById('delete-filter').value
   };

   makeFetchRequest('delete', data);
});

postBtn.addEventListener('click', _ => {
   const data = 
   {
      title: document.getElementById('post-title').value,
      content: document.getElementById('post-content').value
   };

   makeFetchRequest('post', data);
});

refreshBtn.addEventListener('click', _ => {
   fetch('/refresh', {
      method: 'get'
   })
      .then(response => {
         if(response.ok) return response.json();
      })
      .then(data => {
         let diff = data.length - tbody.childElementCount;
         if(diff > 0) {
            let doc              = data[ data.length - 1 ];
            insertRow(doc);
         }

         if(diff < 0) {
            $(tbody).empty();
            
            for(doc of data) {
               insertRow(doc);
            }
         }

         function insertRow(doc) {
            const tr             = document.createElement('TR');
            const tdTitle        = document.createElement('TD');
            const tdContent      = document.createElement('TD');
            tdTitle.innerHTML    = doc.title;
            tdContent.innerHTML  = doc.content;
            tr.append(tdTitle);
            tr.append(tdContent);
            tbody.append(tr);
         }
      })
})

function makeFetchRequest(method, data) {
   fetch('/app', {
      method: method,
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
   })
      .then(response => {
         if (response.ok) return response.json();
      })
      .then(data => {
         checkResponseForUpdateNSendMessage(data);
      });
}

function checkResponseForUpdateNSendMessage(data) {
   let mssg;
   if(data === 0) {
      mssg = 'no match found, created new entry';
     return insertMessaage(mssg);
   }
   if(data === 1) {
      mssg = 'record updated successfully';
      return insertMessaage(mssg);
   }
   if(data === 2) {
      mssg = 'could not find any record with that entry';
      return insertMessaage(mssg);
   }
   if(data === 3) {
      mssg = '1 record has been removed';
      return insertMessaage(mssg);
   }
   mssg = 'successfully added to database';
   insertMessaage(mssg);
}

function insertMessaage(mssg) {
   const message        = document.createElement('DIV');
   const alert          = document.createElement('DIV');
   const alertMsg       = document.createElement('SPAN');
   const timeStamp      = document.createElement('SPAN');
   const close          = document.createElement('BUTTON');
   const closeIcon      = document.createElement('SPAN');

   const closeAttrs     = 
   {
      "type": "button",
      "class": "close",
      "data-dismiss": "alert"
   };
   message.className    = 'message';
   alert.className      = 'alert alert-dismissible fade show';
   timeStamp.className  = 'alert-time-stamp';

   setAttributes(close, closeAttrs);

   alertMsg.innerHTML   = mssg;

   const date           = new Date();
   timeStamp.innerHTML  = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

   closeIcon.innerHTML  = '&times;';

   close.append(closeIcon);
   alert.append(alertMsg);
   alert.append(timeStamp);
   alert.append(close);
   message.append(alert);
   messageBox.append(message);
}


function setAttributes(element, attrs) {
   for (key in attrs) {
      element.setAttribute(key, attrs[key]);
   }
}