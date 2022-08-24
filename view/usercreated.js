
exports.userCreated = (firstname, lastname, email, telephone, city, country,) => {
	return (
		`
		<table class="table" cellpadding="0" cellspacing="0" style="background-color: #202020; empty-cells: hide; margin: 0 auto; padding: 0; width: 100%; height: 100vh">
			<tr style="background-color: #131313;padding-top: 10px;height: 100px">
				<td style="display:flex;align-items:center;height:100%; padding-left: 30px;">
					<img src="https://res.cloudinary.com/dqweh6zte/image/upload/v1649662393/Rhino%20John%20Background%20Video/Rhinojon%20Product%20images/Rhino_card_logo_-_PNG_wtizol.png" alt="RhinoJon prime metals logo" srcset="" style="width: 100px; height:75px">
					<h3 style="box-sizing: border-box; 
										color: #dea95f; font-family: Rubic, sans-serif; letter-spacing: 0.5px; line-height: 1.4; 
										margin: 0; padding-left: 30px; text-align: left; text-transform: capitalize;">
					Rhino John Prime Metals
					</h3>
				</td>
			</tr>
		
			<tr style="background-color: #202020">
				<td style="width: 100%; text-align: left; vertical-align: top; height: auto;padding-left: 30px;font-family: Rubic, sans-serif;">
					<h3 style="box-sizing: border-box; color: #dea95f;"> Dear User </h3>
					<p style="box-sizing: border-box; ;color: rgba(220, 220, 220, 0.8);"> You have successfully created a Rhinojon prime metals Account. Your details are as follows:</p>
					
		
					
					<table style="background-color: #323332; min-width: 70vw;border-radius:4px">
						<tr>
							<td>
								<h4 style="color:#ffffffcc;padding-left: 30px">Firstname   </h4>
							</td>

							<td>
								<p style="color:#ffffffcc;padding-right:30px">:  ${firstname}</p>
							</td>
						</tr>
						
						<tr>
							<td>
								<h4 style="color:#ffffffcc;padding-left:30px">Lastname   </h4>
							</td>

							<td>
								<p style="color:#ffffffcc;padding-right:30px">:  ${lastname}</p>
							</td>
						</tr>

						<tr>
							<td>
								<h4 style="color:#ffffffcc;padding-left:30px">Email   </h4>
							</td>

							<td>
								<p style="color:#ffffffcc;">:  ${email}</p>
							</td>
						</tr>

						<tr>
							<td>
								<h4 style="color:#ffffffcc;padding-left:30px">Telephone number   </h4>
							</td>

							<td>
								<p style="color:#ffffffcc;padding-right:30px">:  ${telephone}</p>
							</td>
						</tr>

						<tr>
							<td>
								<h4 style="color:#ffffffcc;padding-left:30px">City   </h4>
							</td>

							<td>
								<p style="color:#ffffffcc;padding-right:30px">:  ${city}</p>
							</td>
						</tr>

						<tr>
							<td>
								<h4 style="color:#ffffffcc;padding-left:30px">Country   </h4>
							</td>

							<td>
								<p style="color:#ffffffcc;padding-right:30px">:  ${country}</p>
							</td>
						</tr>
					</table>

				</td>
			</tr>
		</table>
		`
	)
}