using DAL.Entities;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace DAL.Context
{
    public class ApplicationSignInManager : SignInManager<ApplicationUser>
    {
        public ApplicationSignInManager(
            UserManager<ApplicationUser> userManager,
            IHttpContextAccessor httpContextAccessor,
            IUserClaimsPrincipalFactory<ApplicationUser> claimsFactory,
            IOptions<IdentityOptions> options,
            ILogger<SignInManager<ApplicationUser>> logger,
            IAuthenticationSchemeProvider provider, IUserConfirmation<ApplicationUser> confirmation
            )
            : base(
                  userManager,
                  httpContextAccessor,
                  claimsFactory,
                  options,
                  logger,
                  provider,
                  confirmation
                  )
        {

        }
    }
}
