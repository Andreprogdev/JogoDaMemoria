let game = {
    
    lockMode : false,
    firstCard : null,
    secundCard : null,
    
    pessoas: ['cecilia1',
        'cecilia2',
        'ceciliaegiovanna1',
        'ceciliaegiovannaepedrinhoelulu1',
        'ceciliaepedrinho1',
        'gael1',
        'gael2',
        'giovanna1',
        'pedrinho1',
        'ceciliaegiovannaelulu1'],

        cards : null,
   
   
    setCard: function (id) {
        
        let card = this.cards.filter(card => card.id=== id)[0];
            if (card.flipped || this.lockMode) {
                return false;   
            }
            if(!this.firstCard){
                this.firstCard = card;
                this.firstCard.flipped = true;
                return true;
            }else{
                this.secondCard = card;
                this.secondCard.flipped = true;
                this.lockMode = true;
                return true;
            }
    
    },
    

        checkMatch : function(){
            if (!this.firstCard || !this.secondCard) {
                return false;
            }
            return this.firstCard.icon === this.secondCard.icon;
        },

        clearCards : function(){
            this.firstCard = null;
            this.secondCard = null;
            this.lockMode = false;
        },

        unflipCards() {
            this.firstCard.flipped = false;
            this.secondCard.flipped = false;
            this.clearCards()
        },
        
        checkGameOver() {

            return this.cards.filter(card => !card.flipped).length == 0;
        },
    
        
        createCardsFromPessoas : function(){
           
            this.cards = [];
            
            this.pessoas.forEach((pessoa) =>{
                this.cards.push(this.createPairFromPessoas(pessoa))
            })
         //pair => pair(para cada par, retorno um par(função seta!))   
            this.cards = this.cards.flatMap(pair => pair );
            this.shuffleCard();
        },
        
        createPairFromPessoas : function(pessoa){
            return [{
                id: this.createIdWithPessoa(pessoa),
                icon: pessoa,
                flipped: false
            }, {
                id: this.createIdWithPessoa(pessoa),
                icon: pessoa,
                flipped: false
            }]
        },
        
        createIdWithPessoa: function (pessoa){
            return pessoa +parseInt(Math.random() * 1000);
        },

        shuffleCard: function (cards){
            let currentIndex = this.cards.length;
            let randomIndex = 0;
        
            while( currentIndex != 0){
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                //Serve para trocar indexs de um array... coloco oq eu vou trocar = pelo que eu vou trocar
                [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
            }
        }
}