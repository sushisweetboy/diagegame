const cards=document.querySelectorAll('.memory-card');             // เข้าถึง element ทุกตัวที่อยู่ใน class
let hasFlippedcard=false;
let lockBoard=false;
let firstcard,secondcard;
let countdown=10;
let cardIsShuffle=false;

function flipCard(){
          if(cardIsShuffle==false){                   //สลับการ์ด
            shuffle();
            cardIsShuffle=true;
          }
      if(lockBoard) return;                 // บล็อกไม่ให้การทำงานของฟั่งชั่นไปต่อในกรณีที่เลือกการ์ดครบสองใบ
      if(this===firstcard) return;                //this หมายถึง element ที่เข้ามาทำงาน ณ ขณะนั้น
    this.classList.add('flip');  
    //คลิกครั้งแรก  
    if(hasFlippedcard==false){                 //เปลี่ยนค่าเป็น มีการพลิกไพ่เเล้ว
         hasFlippedcard=true;
         firstcard=this;                                  //เข้าถึง css 
         return;
    }
                                                  //คลิกครั้งที่สอง เมื่อมีการพลิกไพ่เเล้วจะมาทำงานตรงนี้
        hasFlippedcard=false;
        secondcard=this;                         //เข้าถึง css
        
     checkformath();
    
    }
    function checkformath(){
         let ismath=firstcard.dataset.framework===secondcard.dataset.framework;                     //ดูว่าสองอันที่คลิกเหมือนกันไหม
         ismath ? disablecard() /** ถ้าเหมือน */ : unflipcard(); //ถ้าไม่เหมือน   
              
           }
    
    function disablecard(){
        firstcard.removeEventListener('click',flipCard);                               //เอาฟังชั่นคลิกกับ ฟังชั่นหมุนการ์ดออกจาก element
            secondcard.removeEventListener('click',flipCard);
            resetboard();  
    }
     function unflipcard(){
        countdown--;
       
        console.log('countdown',countdown);
        gameover();
        lockBoard=true;
        console.log('back at unflip');
        setTimeout( ()=>{
          firstcard.classList.remove('flip');
          secondcard.classList.remove('flip');                                                // classlist เท่ากับ css ทุกตัว ที่มีผลต่อ element

            lockBoard=false;
         },1500);
  
      
     }
    function shuffle(){                                                     // เป็นฟังชั่นที่จะถูกเรียกใช้งานทันที ที่
       
            console.log('it work here at shuffle');    
            cards.forEach(card=>{
                let randomPos= Math.floor   ( Math.random()*12);                    //สุ่มให้ element มีการสลับที่กัน
                card.style.order =randomPos;   
                cardisshuffle=true;
              });       
        
       
     };

     function resetboard(){
        [hasFlippedcard,lockBoard]=[false,false];
        [firstcard,secondcard]=[null,null];
     }
    
     function gameover(){
      if(countdown==0){
              window.location.href="level2gameover.html";
      }
     }
cards.forEach(card=>card.addEventListener('click',flipCard))                             //ใส่ฟังชั้น onclick ให้กับ element 