// ISSUES
// can do testing, but deleted our ori database.. need to get it up with port of 5443:5432
// also for our test database, i did docker compose up instead of docker compose --env-file=.env.development up -d abut it still works when I do npm test..

// i followed lms to set up  testing, but couldnt do it
// i then tried to fix it, at the end i fixed it by manually specifying the user, password in docker compost yml for both
// i did npm test and it worked but my apis didnt work anymore... when I chcked docker, 5423:5432 was there (our testing one). but 5443:5432 was not there anymore and was replaced by another weird one 16902:5432 or something like that.
// i then tried docker-compose-down and then docker compose up, and the 5443 port changed

// i said fuck it and let me revert back to code just after first try of testing... and accidentally deleted that 16902:5432 on docker
// so now i got 5423:5432 and testing ok, but normal development docker not there
