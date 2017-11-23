let player = {
    hp: 300,
    maxHp: 300,
    skills: [{
        cd: 1000,
        hurt: 5
    }, {
        cd: 1500,
        hurt: 5
    }, {
        cd: 2000,
        hurt: 5
    }, {
        cd: 2500,
        hurt: 5
    }, {
        cd: 3000,
        hurt: 5
    }, {
        cd: 3500,
        hurt: 5
    }]
}

let monster = {
    hp: 300,
    maxHp: 300,
    skills: [{
        cd: 1000,
        hurt: 5
    }, {
        cd: 1500,
        hurt: 5
    }, {
        cd: 2000,
        hurt: 5
    }, {
        cd: 2500,
        hurt: 5
    }, {
        cd: 3000,
        hurt: 5
    }, {
        cd: 3500,
        hurt: 5
    }]
}

function battle() {
    let timers = [];
    player.skills.forEach((item, index) => {
        timers[index] = setInterval(() => {
            if (monster.hp >= 0) {
                monster.hp -= item.hurt;
                if (monster.hp < 0) {
                    monster.hp = 0;
                }
            } else {
                clearInterval(timers[index]);
            }
        }, item.cd)
    })

    monster.skills.forEach((item, index) => {
        timers[index] = setInterval(() => {
            if (player.hp >= 0) {
                player.hp -= item.hurt;
                if (player.hp < 0) {
                    player.hp = 0;
                }
            } else {
                clearInterval(timers[index]);
            }
        }, item.cd)
    })
    let playerSkills = player.skills;
    let playerSkillsCd = player.skillsCd;
    setInterval(() => {
        playerSkillsCd.forEach((item,index)=>{
            playerSkillsCd[index] -= 200;
            if(playerSkillsCd ===0){
                playerSkills
            }
       })
    }, 200)
}

export {
    battle
}