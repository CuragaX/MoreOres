let s = ((el) => {return document.querySelector(el)})

let Game = {}

Game.launch = () => {
  console.log('Game launched')

  Game.ores = 0
  Game.oreHp = 50
  Game.orePerClick = 1
  Game.level = {
    currentLevel: 1,
    currentStrength: 1,
    currentLuck: 1,
    currentXP: 0,
    XPNeeded: 20,
    availableSP: 0
  }
  Game.tabs = [
    {
      name: 'store',
      locked: false
    }, {
      name: 'upgrades',
      locked: true
    }, {
      name: 'stats',
      locked: false
    }
  ]

  Game.earn = (amount) => {
    Game.ores += amount
    Game.rebuildInventory()
  }

  Game.rebuildInventory = () => {
    s('.ores').innerHTML = 'Ores: ' + Game.ores
  }

  let currentHp = Game.oreHp
  Game.updatePercentage = (amount) => {
    console.log(currentHp)
    if (currentHp > 0) {
      if (currentHp - amount > 0) {
        currentHp -= amount
        s('.ore-hp').innerHTML = `${((currentHp/Game.oreHp)*100).toFixed(0)}%`
      } else {
        currentHp = 0
        s('.ore-hp').innerHTML = `0%`
      }
    } else {
      Game.oreHp = Math.pow(Game.oreHp, 1.15)
      currentHp = Game.oreHp
      s('.ore-hp').innerHTML = `${((currentHp/Game.oreHp)*100).toFixed(0)}%`
    }
  }

  Game.oreClickArea = () => {
    let randomNumber = () => Math.floor(Math.random() * 80) + 1
    let orePos = s('.ore').getBoundingClientRect()
    let randomSign = Math.round(Math.random()) * 2 - 1
    let centerX = (orePos.left + orePos.right) / 2
    let centerY = (orePos.top + orePos.bottom) / 2
    let randomX = centerX + (randomNumber() * randomSign)
    let randomY = centerY + (randomNumber() * randomSign)

    s('.ore-click-area').style.left = randomX + 'px'
    s('.ore-click-area').style.top = randomY + 'px'
  }

  Game.buildTabs = () => {
    let str = ''
    for (i = 0; i < Game.tabs.length; i++) {
      if (Game.tabs[i].locked == false) {
        str += `
          <div id='${Game.tabs[i].name}-tab' class='tab' onclick='Game.switchTab("${Game.tabs[i].name}")'  style='display: flex; align-items: center; justify-content: center;'>
            <p>${Game.tabs[i].name}</p>
          </div>
        `
      }
    }
    s('.tabs').innerHTML = str
  }

  Game.switchTab = (selectedTab) => {
    let tabs = document.querySelectorAll('.tab')
    tabs.forEach((tab) => {
      tab.classList.remove('selected')
    })
    s(`#${selectedTab}-tab`).classList.add('selected')
    Game.buildTabContent(selectedTab)
  }

  Game.buildTabContent = (tab) => {

  }


  s('.ore').onclick = () => {
    Game.earn(Game.orePerClick)
    Game.updatePercentage(Game.orePerClick)
  }

  s('.ore-click-area').onclick = () => {
    Game.earn(Game.orePerClick * 5)
    Game.updatePercentage(Game.orePerClick * 5)
    Game.oreClickArea()
  }

  //Init Shit
  Game.oreClickArea()
  Game.buildTabs()
  Game.switchTab('store')
  window.onresize = () => Game.oreClickArea()

}

window.onload = () => {Game.launch()}