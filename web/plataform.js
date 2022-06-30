document.addEventListener('DOMContentLoaded', () => {
   if(document.title == 'Alexcell — Aulas') {

      //Expandir Área
      document.querySelector('.expand-area').addEventListener('click', ev =>{
         var lessonCont = document.querySelector('.lessons-container')
         if(ev.target.innerText == 'Expandir Layout') {
            lessonCont.classList.add('hide')

            document.querySelector('.body-container.normal-text').classList.add('expand')
            ev.target.innerText = 'Retrair Layout'

            setTimeout(() =>{
               lessonCont.style.position = 'absolute'
            }, 3e2)

            //Ativar botão 'Aulas'
            document.querySelector('.show-module').classList.add('active')

         }else {
            lessonCont.classList.remove('hide')
            document.querySelector('.body-container.normal-text').classList.remove('expand')
            ev.target.innerText = 'Expandir Layout'
            lessonCont.style.position = 'unset'
            // setTimeout(() =>{
            // }, 3e2)

            //Desativar botão 'Aulas'
            document.querySelector('.show-module').classList.remove('active')
         }
      });

      //Mostrar Aulas (modal)
      document.querySelector('.show-module').addEventListener('click', () =>{
         if(document.querySelector('.expand-area').innerText == 'Retrair Layout') {
            var modal = document.querySelector('.modal-lessons')
            var lessonCont = document.querySelector('.lessons-container')

            document.querySelector('.modal-lessons').classList.add('expand')
            modal.style.height = document.body.clientHeight + 'px'

            lessonCont.classList.remove('hide')
            lessonCont.classList.add('modal')
            lessonCont.style.height = document.querySelector('.section-video').clientHeight + 8 + 'px'

            document.querySelector('.modal-lessons').addEventListener('click', ev =>{
               if(ev.target.matches('.modal-lessons')) {
                  document.querySelector('.modal-lessons').classList.remove('expand')
                  modal.style.height = '115vh'

                  lessonCont.classList.add('hide')
                  lessonCont.classList.remove('modal')
                  lessonCont.style.height = '115vh'

               }
            });
         }
      });

      //Expandir-Contrair Ver Mais (video-details)
      document.querySelector('.ver-mais').addEventListener('click', ev => {
         var details = document.querySelector('.video-details')
         if(ev.target.innerText == 'Ver Mais') {
            details.classList.add('expand')
            ev.target.innerText = 'Ver Menos'
         }else {
            details.classList.remove('expand')
            ev.target.innerText = 'Ver Mais'
         }
      });

      //Expandir-Contrair Módulo
      let modules = document.querySelectorAll('.module-div')
      for (i of modules) {
        i.addEventListener('click', ev => {
            var mod = ev.currentTarget.parentElement
            var less = mod.querySelector('.lessons-div')
            if(mod.className != 'module expand') {
               mod.classList.add('expand')
               if (ev.target.matches('.module-div')) {modHeight = ev.target.nextElementSibling.childElementCount * 38.93}
               else {modHeight = ev.target.parentNode.nextElementSibling.childElementCount * 38.93}

               less.style.setProperty('max-height', modHeight + 'px')
            }else {
               mod.classList.remove('expand')
               less.style.setProperty('max-height', '0px')
            }
        });
      }

      //Marcar aula como Assistida
      let marks = document.querySelectorAll('.lessonViewMark')
      for (i of marks) {
        i.addEventListener('click', ev => {
            var path = ev.currentTarget.querySelector('path')
            if(path.className.baseVal == 'mark-grey') {
               path.classList.add('mark-green')
               path.classList.remove('mark-grey')
            }else {
               path.classList.remove('mark-green')
               path.classList.add('mark-grey')
            }
        });
      }

      //Inserir CodeArea
      document.querySelector('.icon.code').addEventListener('click', () =>{
         var cont = document.createElement('div')

         cont.innerHTML =  `<div class="code-container" contenteditable="false">
                              <div class="code-div">
                                 <div class="code-bar">
                                    <div class="btn-close"></div>
                                    <div class="btn-empty"></div>
                                    <div class="btn-empty"></div>
                                 </div>
                                 <button class="copy-btn" type="button">
                                    <svg fill="none" viewBox="0 0 24 24" width="20" stroke="currentColor">
                                       <g id="copyBtn">
                                          <path id="copy-path" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
                                          <path id="copied-path" style="opacity:0; color:#3aeb99" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" ></path>
                                       </g>
                                    </svg>
                                 </button>
                                 <pre><code class="vba" spellcheck="false" contenteditable="true"></code></pre>
                              </div>
                            </div>
                            <br>
                           `

         cont.querySelector('code').addEventListener('paste', formatCode, false);
         document.querySelector('.input-question').innerHTML += cont.innerHTML

         //Função btn-close (fechar CodeArea)
         var btns = document.querySelectorAll('.btn-close')
         for(btn of btns) {
            btn.addEventListener('click', el =>{
               el.target.parentNode.parentNode.parentElement.previousSibling.remove()
               el.target.parentNode.parentNode.parentNode.nextSibling.remove()
               el.target.parentNode.parentNode.parentNode.remove()
            });

            //Code tag highlight
            btn.parentNode.parentNode.querySelector('code').addEventListener('paste', formatCode, false); //code

            //Copy code Content
            btn.parentNode.nextElementSibling.addEventListener('click', copyCode, false); //.copy-btn

            // //Key press Event
            // btn.parentNode.parentNode.addEventListener('input', () => {
            //    console.log('dsigraçaaaaaaaaaaaa')
            // }, false); //.code-div
         }
      });

      //Highlight Code
      function formatCode(ev) {
         ev.stopPropagation()
         ev.preventDefault()
         var newHTML = ev.clipboardData.getData('text')

         var i = newHTML.length;
         var comment = new Boolean(false)
         var normalTxt = new Boolean(false)
         var c = 0

         while (c <= i) {
            if(comment == false && newHTML[c] == "'") {
               comment = true
               // newHTML = newHTML.replace(newHTML[c], "<span>" + newHTML[c])
               newHTML = newHTML.substring(0, c) + '<span class="comment">'  + newHTML.substring(c);
               i += 22
               c += 22
            }else if(comment == true && newHTML[c] == "\n" ) {
               comment = false
               newHTML = newHTML.substring(0, c) + "</span>"  + newHTML.substring(c);
               i += 7
               c += 7
            }

            if(normalTxt == false && newHTML[c] == "\"") {
               normalTxt = true
               newHTML = newHTML.substring(0, c) + '<span class="normal-string">' + newHTML.substring(c);
               i += 28
               c += 28
            }else if(normalTxt == true && newHTML[c] == "\"" ) {
               normalTxt = false
               newHTML = newHTML.substring(0, c +1) + "</span>" + newHTML.substring(c +1) ;
               i += 7
               c += 7
            }
            c++
         }

         let keyWord = ["Public ", "Declare ", "PtrSafe ", "Lib ", "Alias ", "ByVal ", "Private ", "Sub ", " Sub", "Function ", " Function", "End", "Exit", "ReDim ", "Dim ", "As ", "As Object ", " Long", " String", " Byte", "New ", "Set ", "For Each ", "For ", "In ", "Next", "ElseIf ", "If ", " If", "Else", "Then", "True", "False", "Not ", " Empty", "And ", "Or ", "Call ", "Debug ", "Print ", "With ", " To ", "Do ", "Until ","Loop", "Open ", "Close ", "Line Input ", "Input ", "While ", "Wend"];

         let normalString = [":=", "= ", " =", '("', '")', " & ", " - ", " > ", " < ", ",", ": ", " :","[", "]", "(", ")", " + ", " / ", " * ",".", "#"];

         let numbers = newHTML.match(/\d+/g)

         document.querySelector('.code-div').style.color = 'lightgrey'

         for (var i of keyWord) {
            newHTML = newHTML.split(i).join('<span class="key-word">'+i+'</span>')
         }

         for (var i of normalString) {
            newHTML = newHTML.split(i).join( '<span class="normal-string">'+i+'</span>')
         }

         if (numbers != null) {
            for (var i of numbers) {
               newHTML = newHTML.split(i).join( '<span class="normal-string">'+i+'</span>')
            }
         }


         //Fix Comment class
         i = newHTML.length;
         c = 0
         comment = false
         while (c <= i) {
            if(newHTML.substring(c, c + 9) == 'comment">') {
               comment = true
            }
            if(comment == true && newHTML.substring(c, c + 15) == 'normal-string">') {
               newHTML = newHTML.substring(0, c -13) + newHTML.substring(c +15);
               i -= 28
               c -= 13
            }else if (comment == true && newHTML.substring(c, c + 10) == 'key-word">') {
               newHTML = newHTML.substring(0, c -13) + newHTML.substring(c +10);
               i -= 13
               c -= 13
            }
            c++

            if (newHTML[c +7] == "\n") {
               comment = false
            }else if(comment == true && newHTML.substring(c, c +7) == '</span>') {
               newHTML = newHTML.substring(0, c) + newHTML.substring(c +7);
               i -= 7
               c -= 7
            }
         }

         // this.innerHTML = this.innerHTML.replace(/<br>/, '')
         this.innerHTML += newHTML
         this.innerHTML = this.innerHTML.replace(/    /g, '\t')
         this.innerHTML = this.innerHTML.replace(/   /g, '\t')
         this.innerHTML = this.innerHTML.replace(/  /g, ' ')


         //Setar cursor no final do Code (quando copia e cola, o cursor ficava indo pro inicio)
         var selection = document.getSelection();
         var range = document.createRange();
         var code = ev.target;

         if(code.lastChild.nodeType == 3){
           range.setStart(code.lastChild, code.lastChild.length);
         }else{
           range.setStart(code, code.childNodes.length);
         }
         selection.removeAllRanges();
         selection.addRange(range);
      }

      //Copy Code
      async function copyCode(ev) {
         const el = ev.currentTarget
         const code = ev.currentTarget.parentNode.querySelector('code')

         if (code.innerText.length > 3) {
            try {await navigator.clipboard.writeText(code.innerText);}
            catch (err) {return;}

            const copy = el.querySelector('#copy-path')
            const copied = el.querySelector('#copied-path')

            el.style.setProperty('--opct', '1')
            el.style.background = '#4b4d4e'
            el.style.color = '#fff'
            el.style.opacity = '1'
            el.style.setProperty('--dsp', 'block')
            copied.style.opacity = '1'
            copy.style.opacity = '0'
            setTimeout(() => {
               el.style.setProperty('--opct', '0')
               el.style.removeProperty('background')
               el.style.removeProperty('color')
               el.style.removeProperty('opacity')
               // el.style.setProperty('--dsp', 'none')
               copy.style.opacity = '1'
               copied.style.opacity = '0'
            }, 2e3)
         }
         return
      }

      //Indent Text
      document.querySelector('.input-question').addEventListener('keydown', ev => {
         if(ev.key == 'Tab') {
            ev.stopPropagation()
            ev.preventDefault()

            if(ev.shiftKey) {
               document.execCommand("Delete");
            }else {
               document.execCommand('insertText', false, "\t");
            }
         }

      });


   };

})