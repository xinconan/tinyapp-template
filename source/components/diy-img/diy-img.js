Component({
  data: {
    url: '',
  },
  props: {
    className: '',
    src: '',
    errorSrc: '',
    mode: ''
  },
  methods: {
    onImgError(e) {
      this.setData({
        url: this.props.errorSrc
      })
    }
  },
});
