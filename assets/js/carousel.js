class Carousel {
  constructor(p) {
    const settings = { ...{ containerID: '#carousel', slideID: '.slide', interval: 2000, isPlaying: true, }, ...p}
    this.container = document.querySelector(settings.containerID)
    this.slidesItems = this.container.querySelectorAll(settings.slideID)
    this.interval = settings.interval
    this.isPlaying = settings.isPlaying
  }

  _initProps() {
    this.SLIDES_COUNT = this.slidesItems.length
    this.CODE_ARROW_LEFT = 'ArrowLeft'
    this.CODE_ARROW_RIGHT = 'ArrowRight'
    this.CODE_ARROW_SPACE = 'Space'
    this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>'
    this.FA_PLAY = '<i class="fas fa-play-circle"></i>'
    this.FA_PREV ='<i class="fas fa-angle-left"></i>'
    this.FA_NEXT ='<i class="fas fa-angle-right"></i>'

    this.currentSlide = 0
    }

  _initControls () {
    const controls = document.createElement('div')
    const PAUSE = `<span class="control control-pause" id="pause-btn">${this.isPlaying ? this.FA_PAUSE : this.FA_PLAY}</span>`
    const PREV = `<span class="control control-prev" id="prev-btn">${this.FA_PREV}</span>`
    const NEXT =`<span class="control control-next" id="next-btn">${this.FA_NEXT}</span>`

    controls.setAttribute('id', 'controls-container')
    controls.setAttribute('class', 'controls')
    controls.innerHTML = PAUSE + PREV + NEXT
    this.container.append(controls)
    this.pauseBtn =  this.container.querySelector('#pause-btn')
    this.prevBtn = this.container.querySelector('#prev-btn')
    this.nextBtn = this.container.querySelector('#next-btn')
    }
  
  _initIndicators () {
    const indicators = document.createElement('div')

    indicators.setAttribute('id', 'indicators-container')
    indicators.setAttribute('class', 'indicators')

    for (let i = 0; i < this.SLIDES_COUNT; i++) {
      const indicator = document.createElement('span')
      indicator.setAttribute('class', i ? 'indicator' : 'indicator active')
      indicator.dataset.slideTo = i
      indicators.append(indicator)
    }
    this.container.append(indicators)

    this.indicatorsContainer = this.container.querySelector('#indicators-container')
    this.indicatorItems = this.container.querySelectorAll('.indicator')
  }

  _initListeners() {
    document.addEventListener('keydown', this._pressKey.bind(this))
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this))
    this.prevBtn.addEventListener('click',this.prev.bind(this))
    this.nextBtn.addEventListener('click', this.next.bind(this))
    this.indicatorsContainer.addEventListener('click', this._indicateHandler.bind(this))
    // this.container.addEventListener('mouseenter', this.pause.bind(this))
    this.container.addEventListener('mouseleave', this.play.bind(this))

    }

  _gotoNth(n) {
    this.slidesItems[this.currentSlide].classList.toggle('active')
    this.indicatorItems[this.currentSlide].classList.toggle('active')
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT
    this.slidesItems[this.currentSlide].classList.toggle('active')
    this.indicatorItems[this.currentSlide].classList.toggle('active')
  }

  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1)
  }

    _gotoNext() {
    this._gotoNth(this.currentSlide + 1)
  }

  _tick() {
    if (!this.isPlaying) return
    if (this.timerID) return
    this.timerID = setInterval (() => this._gotoNext(), this.interval)
  }

  _indicateHandler(e) {
    const target = e.target
    if (target && target.classList.contains('indicator')) {
    this.pause()
    this._gotoNth(+target.dataset.slideTo)
    }
  }

  _pressKey(e) {
    const code = e.code
    e.preventDefault()
    if (code === this.CODE_ARROW_LEFT)this.prev()
    if (code === this.CODE_ARROW_RIGHT) this.next()
    if (code === this. CODE_ARROW_SPACE) this.pausePlay()
  }

  pause() {
    if (!this.isPlaying) return
    this.isPlaying = false
    clearInterval(this.timerID)
    this.pauseBtn.innerHTML = this.FA_PLAY
    this.timerID = null
  }

  play() {
    if (this.isPlaying) return
    this.isPlaying = true
    this._tick()
    this.pauseBtn.innerHTML = this.FA_PAUSE
  }

  pausePlay() {
    this.isPlaying ? this.pause() : this.play()
  }

  prev() {
    this.pause()
    this._gotoPrev()
  }

  next() {
    this.pause()
    this._gotoNext()
  }

  init() {
    this._initProps()
    this._initControls()
    this._initIndicators()
    this._initListeners()
    this._tick()
  }
}
export default Carousel