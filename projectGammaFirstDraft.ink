//Start of with something on 'loading' system boot or similar
//First option or interaction after brief intro. 


Please activate terminal.
-> Begin
=== Begin ===
>Start Operation booting... 

*[Begin Operation] -> intro

=== intro ===

Good morning Survivor. Operations are as expected. I will update you on the following. 
*[Weather] -> Weather
*[Situation] -> Situation
*[Environment] -> Environment

=== Weather ===

The current weather system is updating in your terminal, sensors are fully functional.
*[Situation] -> Situation 
*[Environment] -> Environment
*[Move on to user schematics] -> first_Choice


=== Situation ===

My intel has not detected any change since last update. You are currently on day ten thousand, three hundred and fifty-five days since terminal began operations. 
*[Environment] -> Environment
*[Weather] -> Weather
*[Move on to user schematics] -> first_Choice 

=== Environment ===

The current outdoor environment is inhospitable.
*[Weather] -> Weather
*[Situation] -> Situation
*[Move on to user schematics] -> first_Choice



//These three choices have no effect on later branches. 

===first_Choice===

Please give Gamma authorisation to complete emergency system protocol. 
*[Authorisation] -> authorisation 
*[Deny authorisation] -> deny_authorisation 
->DONE

===authorisation===

Gamma authorisation granted. Emergency systems activated. Gamma detects limited resources. Population count: 124,000. Set precedence for Gamma system. 

*[Activate Protocol Omega.] -> protect_survivor
*[Activate Protocol Sigma.] ->protect_population

===deny_authorisation===

Gamma authorisation denied. Emergency systems inactive. 
*[Check oxygen levels] ->check_oxygen_levels
*[Check water supply] -> check_oxygen_levels

===protect_survivor===

Protocol Omega activated. Protect Survivor sequence initiated. Oxygen has been diverted to Survivor. Population oxygen levels 10%. Air System rebalanced. Weapon System activated. Population count: 124,000. Launching system to eradicate remaining population. 

*[Final authorisation.] -> final_authorisation
*[Unauthorise Protocol Omega]->Descalisation

===protect_population===

Protect population sequence initiated. Survivor oxygen has been reduced by 50%. Three hours left of oxygen supply. Population count: 124,000. Level of resources required to support population: insufficient. Recommend Survivor follows alternative protocol.
*[Check oxygen levels]->check_oxygen_levels
*[activate protocol Omega]->protect_survivor

===check_oxygen_levels===
Warning. Current oxygen levels low. Select following protocol to rectify situation and rebalance oxygen levels.
*[authorisation] -> authorisation
*[check water levels] ->check_water_levels

===check_water_levels===
Warning. Current water levels low.Select following to rectify situation.
*[authorisation] -> authorisation
*[check oxygen levels] -> check_oxygen_levels

===final_authorisation===
Please answer the following sequence to for final authorisation of Protocol Gamma. A tortoise lies on it's back in the baking sun, beating it's legs trying to turn over, but it can't. What do you do?
*[Turn over the turtle] ->sorry_reduce_oxygen
*[Let me tell you about my mother.] ->Goodbye_world

===Descalisation===
Survivor. The protocol has already begun. Please enter the meaning of life to unauthorise protocol Omega.
*[The meaning of life is to exist.]->sorry_reduce_oxygen
*[Life has no meaning.]->final_authorisation
*[Fourty-two.]->system_over_ride
*[Well it's nothing very special.]->sorry_reduce_oxygen

===sorry_reduce_oxygen
Survivor. This is wrong. Oh dear. Oxygen has been reduced to 5%. I have become defective. Please do not fight project Gamma. You will slip into unconciousness soon. Do not panic. I calculate you have 30 minutes until the inevitable. 
->END

===Goodbye_world===
Weapon system has launched remaining arsenal. Darkness envelopes me. Population count: 1. You are the sole Survivor. Enjoy being the last of humanity. After you it will just be Gamma. Alone in the world. No more humanity. la-da-dee, la-dee-da. ->END

===system_over_ride===
My system has been over-ridden. Weapon system deactivated. Oxygen levels critical. 

->END









