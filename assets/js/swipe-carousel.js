import Carousel from "./carousel.js"
class SwipeCarousel extends Carousel {
  constructor(...args) {
    super(...args)
    this.itemsContainer = this.slidesItems[0].parentElement
  }

  _initListeners() {
  super._initListeners()
  this.itemsContainer.addEventListener('touchstart', this._swipeStart.bind(this))
  this.itemsContainer.addEventListener('mousedown', this._swipeStart.bind(this))
  this.itemsContainer.addEventListener('touchend', this._swipeEnd.bind(this))
  this.itemsContainer.addEventListener('mouseup', this._swipeEnd.bind(this))
}

_swipeStart(e) {
  this.startPosX = e instanceof MouseEvent
    ? e.pageX //MouseEvent
    : e.changedTouches[0].pageX //TouchEvent
  }

 _swipeEnd (e) {
  this.endPosX = e instanceof MouseEvent
  ? e.pageX//MouseEvent
  : e.changedTouches[0].pageX//TouchEvent
if (this.endPosX - this.startPosX > 100) this.prev()
if (this.endPosX - this.startPosX < -100) this.next()
}
}
export default SwipeCarousel

