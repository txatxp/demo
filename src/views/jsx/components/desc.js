export default {
  name: "Describe",
  props: ['vnodes'],
  data() {
    return {};
  },
  render(h) {
    const vnodes = this.vnodes
    return (
      <div>
        {
          vnodes
        }
      </div>
    );
  },
};
