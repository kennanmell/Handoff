/* Represents an organization. Has fields for the
organization's name, location, password and description */
export default class Organization {

	// Sole constructor. Username and uuid are undefined after the call to this constructor
	// because not every use of an Organization class immediately knows/uses the values of
	// these fields.
	constructor(name, loc, description, password, auth) {
		this.name = name;
		this.loc = loc;
		this.description = description;
		this.password = password;
		this.auth = auth;
		this.userName = "temp";
		this.uuid = "temp";
	}
	
	// Returns the name of the organization. Not to be confused with username.
	getName() {
		return this.name
	}
	
	// Sets the name of the organization. Not to be confused with username.
	setName(newName) {
		this.name = newName
	}
	
	// Gets the location of the organization.
	getLocation() {
		return this.loc
	}
	
	// Sets the location of the organization.
	setLocation(newLocation) {
		this.loc = newLocation
	}
	
	// Gets the description of the organization.
	getDescription() {
		return this.description
	}
	
	// Sets the description of the organization.
	setDescription(newDescription) {
		this.description = newDescription
	}
	
	// Gets the password of the organization.
	getPassword() {
		return this.password
	}
	
	// Sets the password of the organization.
	setPassword(newPassword) {
		this.password = newPassword
	}
	
	// Gets the authorization key of the organization.
	getAuth() {
		return this.auth
	}
	
	// Sets the authorization key of the organization.
	setAuth(newAuth) {
		this.auth = newAuth
	}
	
	// Gets the username of the organization. Not to be confused with the name or uuid.
	getUsername() {
		return this.userName;
	}
	
	// Sets the username of the organization. Not to be confused with the name or uuid.
	setUsername(newUsername) {
		this.userName = newUsername;
	}
	
	// Gets the uuid of the organization. Not to be confused with username.
	getUuid() {
		return this.uuid;
	}
	
	// Sets the uuid of the organization. Not to be confused with username.
	setUuid(newUuid) {
		this.uuid = newUuid;
	}
}
