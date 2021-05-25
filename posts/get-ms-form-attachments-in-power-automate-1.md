---
tags:
  - powerautomate
published: true
date: 2021-05-25T14:17:31.653Z
title: "Get MS Form attachments in Power Automate "
---
![](https://i.imgur.com/jCO24Vg_d.webp?maxwidth=760&fidelity=grand)

Using the "When a new response is submitted" trigger for MS Forms First, get the response details for the response that triggered the flow Then do Parse JSON on the form question that allows attachments. In this case the question title is "Select Files" Use the output from Get Response Details as a sample to generate the schema for Parse JSON. I used the below schema: 

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string"
      },
      "link": {
        "type": "string"
      },
      "id": {
        "type": "string"
      },
      "type": {},
      "size": {
        "type": "integer"
      },
      "referenceId": {
        "type": "string"
      },
      "driveId": {
        "type": "string"
      },
      "status": {
        "type": "integer"
      },
      "uploadSessionUrl": {}
    },
    "required": [
      "name",
      "link",
      "id",
      "size",
      "referenceId",
      "driveId",
      "status"
    ]
  }
}
```

![](https://i.imgur.com/OCBt1Xj_d.webp?maxwidth=760&fidelity=grand)![](https://i.imgur.com/OCBt1Xj_d.webp?maxwidth=760&fidelity=grand)

Here is a screenshot of the "Switch to input entire array" button

![](https://i.imgur.com/nZzYj9C_d.webp?maxwidth=760&fidelity=grand)![](https://i.imgur.com/nZzYj9C_d.webp?maxwidth=760&fidelity=grand)

Next, initialize a new Array variable. Then, add an Apply to Each control and as input select the output from the Parse JSON action above.

![](https://i.imgur.com/wZ1EfVn_d.webp?maxwidth=760&fidelity=grand)![](https://i.imgur.com/wZ1EfVn_d.webp?maxwidth=760&fidelity=grand)

Add a Get File Content action. Use the OneDrive-flavored one since the files attached to MS Forms are stored in OneDrive by default. Pass in the id value from the Parse JSON

![](https://i.imgur.com/3xdv8oo_d.webp?maxwidth=760&fidelity=grand)![](https://i.imgur.com/3xdv8oo_d.webp?maxwidth=760&fidelity=grand)

Next, add an "Append to array" action and specify the array we initialized earlier. In the Value field, define an object with "Name" and "ContentBytes" properties. "Name" comes from the output of Parse JSON and ContentBytes comes from the output of Get File Content. e.g. 
```json
{ 
  "Name": @{items('Apply_to_each')['name']}, 
  "ContentBytes":    
    @{outputs('Get_file_content_2')?\['body']} 
}
```

![](https://i.imgur.com/aY1xjGg_d.webp?maxwidth=760&fidelity=grand)![](https://i.imgur.com/aY1xjGg_d.webp?maxwidth=760&fidelity=grand)

Next, add a Send an Email action after the Apply to Each loop. In the email "Attachments" parameter, click on the little button in the upper right labeled "Switch to input entire array", then specify the array variable containing attachment files' names and content.

