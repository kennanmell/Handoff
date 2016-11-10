/* Represents an organization. Has fields for the
organization's name, location, and description */
export default class Organization {
	constructor(name, loc, description) {
		this.name = name;
		this.loc = loc;
		this.description = description;
	}
}