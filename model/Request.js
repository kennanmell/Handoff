// This class represents a request by an organization for a specific type of donation.

export default class Request {

    /* The constructor should be passed in a string to represent the title of the request,
    a string to represent the message/text of the request, an Organization object which
    is the org that made the request, and any tags the org provides that relate to the
    request */
    constructor(title, text, organization, tags) {
        this.title = title
        this.text = text
        this.organization = organization
        this.tags = tags
    }


}

