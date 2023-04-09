
exports.accountEditedView = (user) => {
	return (
		`
		<table class="table" cellpadding="0" cellspacing="0" style="background-color: #202020; empty-cells: hide; margin: 0 auto; padding: 0; width: 100%; height: 100vh">
			<tr style="background-color: #131313;padding-top: 10px;height: 100px">
				<td style="display: flex; align-items: center;height:100%; padding-left: 30px;">
					<img src="https://res.cloudinary.com/dqweh6zte/image/upload/v1649662393/Rhino%20John%20Background%20Video/Rhinojon%20Product%20images/Rhino_card_logo_-_PNG_wtizol.png" alt="RhinoJon prime metals logo" srcset="" style="width: 100px; ">
					<h3 style="box-sizing: border-box; 
										color: #dea95f;font-family:Rubic,sans-serif;letter-spacing: 0.5px; line-height: 1.4; 
										margin: 0; padding-left: 30px; text-align: left; text-transform: capitalize;">
						Acount edit
					</h3>
				</td>
			</tr>
		
			<tr style="background-color: #202020;height: auto;">
				<td style="width: 100%; text-align: left; vertical-align: top; padding-left: 30px;font-family: Rubic, sans-serif;">
					<h3 style="box-sizing: border-box; color: #dea95f;"> Dear User </h3>
					<p style="box-sizing: border-box; ;color: rgba(220, 220, 220, 0.8);">Account was edited successfully</p>
				</td>
			</tr>
		</table>
		`
	)
}