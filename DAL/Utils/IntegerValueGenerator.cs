

using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using System.Diagnostics.CodeAnalysis;
using System.Threading;

namespace DAL.Utils
{
    public class IntegerValueGenerator : ValueGenerator<int>
    {
        private int _current;

        public override bool GeneratesTemporaryValues => false;

        public override int Next([NotNullAttribute] EntityEntry entry)
            => Interlocked.Increment(ref _current);
    }
}
