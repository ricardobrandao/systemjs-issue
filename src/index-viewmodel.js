import ko from 'knockout';
import UserModel from 'users/user-model';

class IndexViewModel {
	constructor() {
		this.message = 'Hello, World';

		this.initialize();
	}

	initialize() {
		this.user = new UserModel({name: 'John Doe'});
		this.isInitialized = ko.observable(true);
	}
}

export default new IndexViewModel();
