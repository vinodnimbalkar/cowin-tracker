# cowin-tracker

Check your nearest vaccination center and slots availability for your age group from your terminal.

### Installation

Either through cloning with git or by using npm (the recommended way): <br />
`npm install -g cowin-tracker` <br />
and cowin-tracker will be installed globally to your system path.

### Usage

`cowin-tracker check --pincode 110002 --age 45` OR `cowin-tracker check -p 110002 -a 45`

```bash
Vaccine are avaible in 2 centers
Girdhari Lal SITE 1 MRS GLM Hospital, 110002, Central Delhi
153 doses of COVAXIN vaccine for 45 age group avaible on 05-05-2021
187 doses of COVAXIN vaccine for 45 age group avaible on 06-05-2021
192 doses of COVAXIN vaccine for 45 age group avaible on 07-05-2021
185 doses of COVAXIN vaccine for 45 age group avaible on 08-05-2021
186 doses of COVAXIN vaccine for 45 age group avaible on 10-05-2021
196 doses of COVAXIN vaccine for 45 age group avaible on 11-05-2021

MCW Kanchan Puri PHC 42141,Ansari Road, Daryaganj, Delhi 110002, 110002, Central Delhi
16 doses of COVAXIN vaccine for 45 age group avaible on 06-05-2021
35 doses of COVAXIN vaccine for 45 age group avaible on 08-05-2021
31 doses of COVAXIN vaccine for 45 age group avaible on 10-05-2021
```

### How do I run locally

- Clone this repository `git clone https://github.com/vinodnimbalkar/cowin-tracker.git`
- `cd cowin-tracker`
- Install dependencies `npm i`
- `node index.js check --pincode 110001 --age 25` OR `node index.js check -p 110001 -a 25`

## Contributing

Feel free to open an issue (or even better, send a Pull Request). Contributions are very welcome!! 😄

## Note

This package uses the API provided by the Government of India http://cowin.gov.in
