/* Represents an organization. Has fields for the
organization's name, location, password and description */
export default class Organization {
	constructor(name, loc, description, password) {
		this.name = name;
		this.loc = loc;
		this.description = description;
		this.password = password;
		this.userName = "temp";
		this.uuid = "temp";
	}
}