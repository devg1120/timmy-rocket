import Ember from "ember";
export default Ember.Route.extend({
    actions: {
        didTransition() {
            this.set('controller.refresh', !this.get('controller.refresh'));
        }
    }
})
