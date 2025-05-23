import urllib.parse

def get_content_ids(data):
    sections = data["data"]["AppPresentation_queryAppListV2"][0]["sections"]
    return [section["listSingleCardContent"]["cardLink"]["route"]["typedParams"]["contentId"] for section in sections if "listSingleCardContent" in section]

def get_relevant_info(data):
    sections = data["data"]["AppPresentation_queryAppDetailV2"][0]["sections"]
    phone = ''
    website = ''

    if sections[1].get("contactLinks") and sections[1].get("contactLinks")[0].get("link").get("externalUrl"):
        website = sections[1]["contactLinks"][0]["link"]["externalUrl"]

    if sections[1].get("contactLinks") and len(sections[1].get("contactLinks")) > 1 and sections[1].get("contactLinks")[1].get("link").get("externalUrl"):
        decoded_phone = urllib.parse.unquote(sections[1]["contactLinks"][1]["link"]["externalUrl"])
        phone = decoded_phone.replace('tel:+55', '')

    return {
        "hero": sections[0]["heroContent"][2]["data"]["sizes"][5]["url"],
        "name": sections[1]["name"],
        "numberReviews": sections[1]["numberReviews"],
        "rating": sections[1]["rating"],
        "website": website,
        "phone": phone,
        "address": sections[4]["address"]["address"],
        "latitude": sections[4]["address"]["geoPoint"]["latitude"],
        "longitude": sections[4]["address"]["geoPoint"]["longitude"],

    }