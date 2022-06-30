document.addEventListener('DOMContentLoaded', () => {

   document.querySelector('.topnav').addEventListener('click', ev =>{
      if(ev.target.matches('.soon'))
         document.querySelector('.work-modal').classList.add('active')
   });

   document.querySelector('.work-modal').addEventListener('click', ev =>{
      if(ev.target.matches('.work-modal'))
         document.querySelector('.work-modal').classList.remove('active')
   });

})